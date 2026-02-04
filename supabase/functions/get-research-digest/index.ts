import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has active membership
    const { data: membership, error: membershipError } = await supabaseClient
      .from('memberships')
      .select('status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (membershipError || !membership) {
      return new Response(
        JSON.stringify({ error: 'Active Foundry Club membership required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse query params
    const url = new URL(req.url)
    const weekOf = url.searchParams.get('week_of')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    console.log(`Fetching research digest(s) for user: ${user.id}, week_of: ${weekOf || 'latest'}`)

    let query = supabaseClient
      .from('research_digests')
      .select('*')
      .eq('is_published', true)
      .order('week_of', { ascending: false })

    if (weekOf) {
      query = query.eq('week_of', weekOf)
    } else {
      query = query.limit(limit)
    }

    const { data: digests, error: digestError } = await query

    if (digestError) {
      console.error('Error fetching digests:', digestError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch digests', details: digestError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If requesting specific week and not found
    if (weekOf && (!digests || digests.length === 0)) {
      return new Response(
        JSON.stringify({ error: 'Digest not found for specified week' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Returning ${digests?.length || 0} digest(s)`)

    return new Response(
      JSON.stringify({ 
        success: true,
        digests: digests || [],
        latest: digests?.[0] || null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in get-research-digest:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
