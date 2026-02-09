
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
		colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Foundry Club premium colors
				'foundry-club': {
					dark: 'hsl(var(--foundry-club-dark))',
					surface: 'hsl(var(--foundry-club-surface))',
					accent: 'hsl(var(--foundry-club-accent))',
					glow: 'hsl(var(--foundry-club-glow))',
				},
				// Custom colors for Pulse Robot
				pulse: {
					"50": "#fff7ed",
					"100": "#ffedd5",
					"200": "#fed7aa",
					"300": "#fdba74",
					"400": "#fb923c",
					"500": "#f97316",
					"600": "#ea580c",
					"700": "#c2410c",
					"800": "#9a3412",
					"900": "#7c2d12",
					"950": "#431407",
				},
				dark: {
					"900": "#121212",
					"800": "#1e1e1e",
					"700": "#2d2d2d",
					"600": "#3d3d3d",
				},
				// Premium accent colors
				gold: {
					DEFAULT: '#D4A84B',
					light: '#E5C77A',
					dark: '#B8913A',
				},
				cream: {
					DEFAULT: '#F9F7F4',
					light: '#FDFCFA',
					dark: '#F0EDE8',
				},
				// Warm organic palette
				stone: {
					warm: '#E8E4DF',
					light: '#F5F3F0',
					DEFAULT: '#D9D4CD',
				},
				terracotta: {
					light: '#E8A87C',
					DEFAULT: '#C4703C',
					dark: '#A65A2E',
				},
				peach: {
					light: '#FBE8DC',
					DEFAULT: '#F4C9A8',
					dark: '#E5A67A',
				},
				charcoal: {
					light: '#4A4540',
					DEFAULT: '#2D2926',
					dark: '#1A1816',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
			'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'peptide-scroll': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'spin-glow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'star-btn': {
					'0%': { offsetDistance: '0%' },
					'100%': { offsetDistance: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1.2s ease-out forwards',
				'fade-in-right': 'fade-in-right 1.2s ease-out forwards',
				'fade-in-left': 'fade-in-left 1.2s ease-out forwards',
				'fade-in-up': 'fade-in 1.2s ease-out forwards',
				'pulse-slow': 'pulse-slow 4s infinite',
				'float': 'float 8s ease-in-out infinite',
				'peptide-scroll': 'peptide-scroll 50s linear infinite',
				'spin-glow': 'spin-glow 4s linear infinite',
				'star-btn': 'star-btn calc(var(--duration)*1s) linear infinite'
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
				'hero-gradient-2': 'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)',
				'pulse-gradient': 'linear-gradient(180deg, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 100%)',
			},
		fontFamily: {
			'sans': ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
			'serif': ['"Playfair Display"', 'Georgia', 'serif'],
			'display': ['"Playfair Display"', 'Georgia', 'serif'],
			'brockmann': ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
			'playfair': ['"Playfair Display"', 'Georgia', 'serif'],
		},
			boxShadow: {
				'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
