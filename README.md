# Minimalist Academic Website

A clean, minimalist personal website for academics featuring automatic publication management from BibTeX files.

## Features

- 🎨 **Minimalist Design**: Clean, modern aesthetic with thin Inter font
- 📚 **Automatic Publications**: Parses BibTeX files and generates formatted publication lists
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- ⚡ **Static**: Pure HTML/CSS/JavaScript - no build process required
- 🎯 **Chronological Sorting**: Publications automatically sorted by year and month

## GitHub Pages Deployment

### Option 1: Subdirectory Deployment (e.g., username.github.io/minimalist_website)

1. **Commit all files:**
   ```bash
   git add .
   git commit -m "Add minimalist website"
   git push
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select your main branch
   - Set the folder to `/minimalist_website` (or root if files are in root)
   - Click "Save"

3. **Access your site:**
   - Your site will be available at: `https://username.github.io/minimalist_website/`
   - Wait a few minutes for GitHub to build and deploy

### Option 2: Root Deployment (e.g., username.github.io)

1. **Copy files to repository root:**
   ```bash
   cp minimalist_website/* .
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Deploy minimalist website to root"
   git push
   ```

3. **Enable GitHub Pages:**
   - Go to repository settings → Pages
   - Select main branch and root folder
   - Your site will be at: `https://username.github.io/`

## Local Development

Test your site locally before deploying:

```bash
cd minimalist_website
python3 -m http.server 8080
```

Then visit: `http://localhost:8080`

**Note:** Use a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux) to clear cache when testing changes.

## File Structure

```
minimalist_website/
├── index.html              # Home page
├── publications.html       # Publications page
├── service.html           # Service/Teaching page
├── style.css              # All styles
├── bibtex-parser.js       # BibTeX parser
├── publications.js        # Publications renderer
├── publications.bib       # Your publications in BibTeX format
├── .nojekyll             # Tells GitHub Pages to skip Jekyll processing
└── asset/
    ├── profile_pic.jpg    # Profile picture
    └── resume.pdf         # CV/Resume
```

## Updating Publications

Simply edit `publications.bib` with your BibTeX entries. The site will automatically:
- Parse the BibTeX file
- Sort by year (descending) and month (descending)
- Format authors (converts "LASTNAME, FIRSTNAME" to "FIRSTNAME LASTNAME")
- Display venue badges
- Add links for PDF, arXiv, code, etc.

### BibTeX Field Support

- `title` - Paper title
- `author` - Authors (supports `{${*}$}` for equal contribution)
- `year` - Publication year
- `month` - Publication month (jan, feb, mar, etc.)
- `abbr` - Venue abbreviation (shows as badge)
- `booktitle` / `journal` - Venue name
- `pdf` - Direct PDF link
- `arxiv` - arXiv ID
- `code` - Code repository URL
- `website` - Project website
- `slides` - Slides URL
- `poster` - Poster URL
- `talk` - Video/talk URL
- `doi` - DOI
- `abstract` - Paper abstract
- `award` - Award name
- `bibtex_show` - Set to `true` to show BibTeX button

## Customization

### Colors & Typography

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #000;
    --text-color: #333;
    --light-gray: #fafafa;
    --border-color: #e0e0e0;
}
```

### Profile Information

Edit `index.html`:
- Update name, title, email
- Modify bio text
- Change social media links

### Font

Currently using Inter font. To change, update the Google Fonts import in all HTML files and the `font-family` in CSS.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled for publications page

## Troubleshooting

### Publications not loading
- Check browser console for errors
- Verify `publications.bib` exists and is valid BibTeX
- Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Styles not applying
- Clear browser cache
- Check that `style.css` path is correct in HTML files
- Verify CSS file is not corrupted

### GitHub Pages 404 error
- Ensure `.nojekyll` file exists
- Check that GitHub Pages is enabled in repository settings
- Wait a few minutes for deployment to complete

## Credits

Built with vanilla HTML, CSS, and JavaScript. Uses Inter font from Google Fonts.

## License

Feel free to use this template for your own academic website.
