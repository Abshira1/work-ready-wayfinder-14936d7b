# Work Ready Wayfinder

Build a simple, mobile-friendly web app called "Skills Pathway Checker" for skilled refugees. The app has a single page with a form asking for:

- Country of residence (dropdown: Kenya, Uganda, Other)

- Highest qualification (dropdown: Secondary, Diploma, Bachelor's, Master's, PhD)

- Field of work (text input)

- Years of work experience (number input)

- Do you have your certificates with you? (Yes / No / Partly)

- Are you legally allowed to work? (Yes / No / Not sure)

When the user clicks "Check My Pathway," show a results card with:

1. A list of credentials they may need to verify, based on their qualification and whether they have certificates

2. Suggested next legal or paperwork steps, based on work authorization status

3. Two suggested free learning or mentorship options that match their field (use placeholder links for now)

Use simple rules in the code (if/else logic), not an external AI API. Use a clean, modern design with large buttons and easy-to-read text. Add a short disclaimer at the bottom: "This tool gives general guidance. Confirm requirements with official authorities." Do not require login. Make sure the app runs without errors and test it with three sample profiles before finishing.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://work-ready-wayfinder.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8b3b1983-42ef-55bf-ad16-e1b6cdd37abf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
