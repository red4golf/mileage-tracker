# Contributing to Mileage Tracker

First off, thank you for considering contributing to Mileage Tracker! It's people like you that make this tool better for everyone.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Describe the behavior you observed and what you expected to see
- Include screenshots if possible
- Mention your operating system and browser
- Include any relevant error messages

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. Ensure the test suite passes
4. Update the documentation
5. Create the pull request!

## Development Process

1. Set up your development environment:
   ```bash
   npm install
   cd client
   npm install
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit:
   ```bash
   git commit -m "Description of your changes"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

### Style Guidelines

#### JavaScript/TypeScript

- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use functional components with hooks for React
- Implement proper type definitions

#### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain dark mode support

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests liberally after the first line

### Documentation

- Update the README.md if needed
- Add JSDoc comments for new functions
- Update type definitions
- Include comments for complex logic

## Project Structure

Follow the existing project structure:

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── services/         # API and service layer
├── types/           # TypeScript interfaces/types
└── utils/           # Helper functions
```

### Component Guidelines

- Keep components focused and single-responsibility
- Use TypeScript interfaces for props
- Implement error boundaries where appropriate
- Include loading states
- Support dark mode

### Testing

- Write tests for new features
- Update existing tests when modifying features
- Run the full test suite before submitting PRs

## Questions?

Feel free to open an issue with the "question" label if you need help or clarification.