# Contributing to Finstable

Thanks for your interest in improving **Finstable**.

This project is currently maintained by:

- Kushal Karmakar
- Sumit Prasad

We welcome meaningful contributions that improve the platform, fix bugs, or introduce useful financial features.

---

## Before You Start

For major feature additions, architecture changes, or database modifications:

Please contact the maintainers first and discuss your idea before implementation.

This helps avoid:

- duplicate work
- conflicting implementations
- unnecessary schema changes

You can reach us through:

- GitHub Issues
- LinkedIn
- Email

---

# Contribution Workflow

## 1. Fork the Repository

Create your own fork of the repository on :contentReference[oaicite:0]{index=0}.

---

## 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/finstable.git
```

---

## 3. Create a Feature Branch

Never work directly on `main`.

Create a branch based on the feature/fix you're working on:

```bash
git checkout -b feature/add-budget-module
```

Examples:

- `feature/account-transfers`
- `feature/email-alerts`
- `bugfix/login-validation`
- `docs/api-documentation`

---

## 4. Sync With Latest Changes

Before starting major work:

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/finstable.git
git fetch upstream
git merge upstream/main
```

This ensures your branch is updated with the latest changes.

---

## 5. Implement Your Changes

Write clean, maintainable code.

Please follow:

- Existing project structure
- Naming conventions
- Clean service separation
- Proper validation
- Meaningful commit messages

---

## 6. Test Your Changes

Before submitting:

- Ensure the application runs successfully
- Verify APIs function correctly
- Test database migrations if applicable
- Update documentation if needed

Future contributors may also add:

- JUnit tests
- Mockito tests

---

## 7. Commit Changes

Use meaningful commit messages:

```bash
git commit -m "Add recurring payment reminder logic"
```

Avoid:

```bash
git commit -m "fixed stuff"
```

---

## 8. Push Changes

```bash
git push origin feature/add-budget-module
```

---

## 9. Open Pull Request

Open a Pull Request to the main repository.

Include:

- What problem you solved
- What changes were made
- Any database changes
- Screenshots (if frontend changes exist)

---

# Contribution Guidelines

Please avoid:

- Breaking existing APIs
- Large undocumented schema changes
- Direct pushes to main branch
- Unnecessary dependency additions

---

# Good First Contributions

Some ideas:

- Budget tracking module
- Email notifications
- Better analytics
- Docker setup
- Improved testing coverage
- API documentation improvements
- Internal account transfers

---

# Questions?

Feel free to contact the maintainers if you'd like to contribute.