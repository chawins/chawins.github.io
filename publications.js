/**
 * Publications Rendering System
 * =============================
 * This script automatically loads, parses, and displays publications from a BibTeX file.
 * 
 * Key Features:
 * - Fetches publications.bib from the same directory as the HTML file
 * - Parses BibTeX entries using the BibtexParser class (defined in bibtex-parser.js)
 * - Organizes publications by year (newest first)
 * - Creates interactive HTML elements with expandable abstracts and BibTeX viewer
 * - Supports multiple link types (PDF, arXiv, code, DOI, slides, etc.)
 * - Highlights awards with trophy icons
 * - Bolds author names matching "Sitawarin"
 * 
 * Dependencies:
 * - bibtex-parser.js must be loaded before this script
 * - Requires publications.bib in the same directory
 * 
 * Usage:
 * 1. Include both <script src="bibtex-parser.js"></script> and <script src="publications.js"></script>
 * 2. Ensure publications.bib exists in the same directory
 * 3. The script automatically runs on page load via DOMContentLoaded event
 */

/**
 * Loads and processes the BibTeX file
 * 
 * This async function:
 * 1. Fetches publications.bib using the Fetch API (requires HTTP server, not file://)
 * 2. Passes the content to BibtexParser for parsing
 * 3. Organizes entries by year
 * 4. Renders the publications to the DOM
 * 5. Displays error message if loading fails
 * 
 * @async
 * @throws {Error} If the fetch fails or file doesn't exist
 */
async function loadPublications() {
    try {
        // Fetch the BibTeX file from the same directory as this HTML page
        // Note: This requires the page to be served via HTTP (e.g., python -m http.server)
        // Opening the HTML file directly (file://) will cause CORS errors
        const response = await fetch('publications.bib');
        if (!response.ok) {
            throw new Error('Failed to load publications');
        }
        
        // Extract the text content of the BibTeX file
        const bibtexContent = await response.text();
        
        // Create a parser instance and parse the BibTeX content
        // BibtexParser is defined in bibtex-parser.js
        const parser = new BibtexParser(bibtexContent);
        parser.parse();
        
        // Get entries organized by year in descending order (newest first)
        const entriesByYear = parser.getEntriesByYear();
        
        // Generate and insert HTML elements for all publications
        renderPublications(entriesByYear);
    } catch (error) {
        // Log error to console for debugging
        console.error('Error loading publications:', error);
        
        // Display user-friendly error message
        document.getElementById('publications-container').innerHTML = 
            '<div class="error">Failed to load publications. Please check the console for details.</div>';
    }
}

/**
 * Renders publications organized by year
 * 
 * Takes the parsed publication data and creates HTML structure:
 * - Creates a section for each year with a year header
 * - Adds all publications from that year under the header
 * - Clears any existing content (like "Loading..." message)
 * 
 * @param {Array} entriesByYear - Array of objects with {year: string, entries: Array} structure
 */
function renderPublications(entriesByYear) {
    const container = document.getElementById('publications-container');
    container.innerHTML = ''; // Clear loading message

    // Iterate through each year (already sorted newest to oldest by parser)
    entriesByYear.forEach(({ year, entries }) => {
        // Create section for this year
        const yearSection = document.createElement('div');
        yearSection.className = 'year-section';
        
        // Add year header (e.g., "2024")
        const yearHeader = document.createElement('h2');
        yearHeader.textContent = year;
        yearSection.appendChild(yearHeader);

        // Add all publications from this year
        entries.forEach(entry => {
            const pubDiv = createPublicationElement(entry);
            yearSection.appendChild(pubDiv);
        });

        container.appendChild(yearSection);
    });
}

/**
 * Creates a complete HTML element for a single publication
 * 
 * Builds a structured div containing:
 * - Title (h3)
 * - Authors (with highlighted matching names)
 * - Venue (conference/journal with abbreviation if available)
 * - Award (if present, shown with trophy icon)
 * - Abstract (hidden by default, expandable via button)
 * - Links (PDF, arXiv, code, DOI, slides, poster, talk, website, BibTeX)
 * 
 * @param {Object} entry - Parsed BibTeX entry object with fields like title, author, etc.
 * @returns {HTMLDivElement} Complete publication element ready to insert into DOM
 */
function createPublicationElement(entry) {
    const div = document.createElement('div');
    div.className = 'publication';

    // Title - the paper's title
    const title = document.createElement('h3');
    title.textContent = entry.title || 'Untitled';
    
    // Debug: Log entries without titles
    if (!entry.title) {
        console.warn('Entry without title:', entry.key, entry);
    }
    
    div.appendChild(title);

    // Authors - formatted with highlighted names (see formatAuthors function)
    if (entry.author) {
        const authors = document.createElement('div');
        authors.className = 'authors';
        authors.innerHTML = formatAuthors(entry.author); // Using innerHTML to support <strong> tags
        div.appendChild(authors);
    }

    // Venue - conference (booktitle) or journal with optional abbreviation
    if (entry.booktitle || entry.journal) {
        const venue = document.createElement('div');
        venue.className = 'venue';
        
        // Add abbreviation as a styled badge if available
        if (entry.abbr) {
            const abbrBadge = document.createElement('span');
            abbrBadge.className = 'abbr-badge';
            abbrBadge.textContent = entry.abbr;
            venue.appendChild(abbrBadge);
            venue.appendChild(document.createTextNode(' '));
        }
        
        const venueName = entry.booktitle || entry.journal;
        venue.appendChild(document.createTextNode(venueName));
        
        if (entry.year) {
            venue.appendChild(document.createTextNode(`, ${entry.year}`));
        }
        if (entry.note) {
            venue.appendChild(document.createTextNode(` — ${entry.note}`)); // Additional info like "Oral presentation"
        }
        div.appendChild(venue);
    }

    // Award - shows trophy icon if paper received an award
    if (entry.award || entry.award_name) {
        const award = document.createElement('div');
        award.className = 'award';
        award.textContent = `🏆 ${entry.award || entry.award_name}`;
        div.appendChild(award);
    }

    // Abstract - hidden by default, toggled by "Abstract" button below
    if (entry.abstract) {
        const abstract = document.createElement('div');
        abstract.className = 'abstract'; // CSS controls visibility via .abstract.show
        abstract.textContent = entry.abstract;
        div.appendChild(abstract);
    }

    // Links section - contains all interactive buttons and links
    const links = document.createElement('div');
    links.className = 'links';

    // Abstract toggle button - shows/hides the abstract text
    if (entry.abstract) {
        const abstractBtn = document.createElement('button');
        abstractBtn.textContent = 'Abstract';
        abstractBtn.onclick = () => {
            const abstractDiv = div.querySelector('.abstract');
            abstractDiv.classList.toggle('show'); // CSS transition handles animation
            // Update button text based on current state
            abstractBtn.textContent = abstractDiv.classList.contains('show') ? 'Hide Abstract' : 'Abstract';
        };
        links.appendChild(abstractBtn);
    }

    // PDF link - direct link to paper PDF
    if (entry.pdf) {
        links.appendChild(createLink('PDF', entry.pdf));
    }

    // arXiv link - constructs URL from arXiv ID (e.g., "1234.5678" -> "https://arxiv.org/abs/1234.5678")
    if (entry.arxiv) {
        links.appendChild(createLink('arXiv', `https://arxiv.org/abs/${entry.arxiv}`));
    }

    // Code link - link to code repository (usually GitHub)
    if (entry.code) {
        links.appendChild(createLink('Code', entry.code));
    }

    // DOI link - constructs DOI URL (e.g., "10.1234/abc" -> "https://doi.org/10.1234/abc")
    if (entry.doi) {
        links.appendChild(createLink('DOI', `https://doi.org/${entry.doi}`));
    }

    // Slides link - can be full URL or relative path to assets folder
    if (entry.slides) {
        const slidesUrl = entry.slides.startsWith('http') ? entry.slides : `../asset/pdf/${entry.slides}`;
        links.appendChild(createLink('Slides', slidesUrl));
    }

    // Poster link - can be full URL or relative path to assets folder
    if (entry.poster) {
        const posterUrl = entry.poster.startsWith('http') ? entry.poster : `../asset/pdf/${entry.poster}`;
        links.appendChild(createLink('Poster', posterUrl));
    }

    // Talk/Video link - link to recorded presentation
    if (entry.talk) {
        links.appendChild(createLink('Talk', entry.talk));
    }

    // Website link - project website or demo
    if (entry.website) {
        links.appendChild(createLink('Website', entry.website));
    }

    // URL link - fallback for generic links (only if no PDF is provided)
    if (entry.url && !entry.pdf && !entry.arxiv) {
        links.appendChild(createLink('Link', entry.url));
    }

    // BibTeX button - opens modal with citation text
    const bibtexBtn = document.createElement('button');
    bibtexBtn.textContent = 'BibTeX';
    bibtexBtn.onclick = () => {
        showBibtex(entry); // Opens modal dialog (defined below)
    };
    links.appendChild(bibtexBtn);

    div.appendChild(links);

    return div;
}

/**
 * Creates an anchor element for external links
 * 
 * @param {string} text - Display text for the link
 * @param {string} url - URL to link to
 * @returns {HTMLAnchorElement} Configured anchor element
 */
function createLink(text, url) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = url;
    link.target = '_blank'; // Open in new tab
    link.rel = 'noopener noreferrer'; // Security best practice for external links
    return link;
}

/**
 * Formats author string with highlighting
 * 
 * Takes a BibTeX author string (format: "Last, First and Last2, First2")
 * converts to "First Last" format, and highlights matching names.
 * Authors matching "Sitawarin" are wrapped in <strong> tags for bold highlighting.
 * 
 * @param {string} authorString - Raw author string from BibTeX (e.g., "Doe, John and Smith, Jane")
 * @returns {string} HTML string with formatted authors (may contain <strong> tags)
 */
function formatAuthors(authorString) {
    // BibTeX uses "and" as the separator between authors
    const authors = authorString.split(' and ').map(a => a.trim());
    
    // Convert each author from "LASTNAME, FIRSTNAME" to "FIRSTNAME LASTNAME" and highlight
    const formatted = authors.map(author => {
        let formattedName = author;
        
        // Convert "LASTNAME, FIRSTNAME" to "FIRSTNAME LASTNAME"
        if (author.includes(',')) {
            const parts = author.split(',').map(part => part.trim());
            if (parts.length >= 2) {
                // Handle cases like "Sitawarin, Chawin" -> "Chawin Sitawarin"
                formattedName = `${parts[1]} ${parts[0]}`;
            }
        }
        
        // Convert asterisk to superscript (indicates equal contribution)
        formattedName = formattedName.replace(/\*/g, '<sup>*</sup>');
        
        // Highlight the main author by wrapping their name in <strong> tags
        if (formattedName.includes('Sitawarin')) {
            return `<strong>${formattedName}</strong>`;
        }
        return formattedName;
    });

    // Join with comma-space for display
    return formatted.join(', ');
}

/**
 * Displays a modal dialog with BibTeX citation
 * 
 * Creates an overlay modal containing:
 * - Formatted BibTeX citation in a <pre> block
 * - Close button to dismiss the modal
 * - Copy to Clipboard button with success feedback
 * 
 * The modal can be closed by:
 * - Clicking the Close button
 * - Clicking outside the content area (on the dark overlay)
 * 
 * @param {Object} entry - Publication entry object to generate BibTeX from
 */
function showBibtex(entry) {
    // Generate BibTeX string from the entry
    const bibtex = generateBibtex(entry);
    
    // Create modal overlay (dark background)
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    // Create content container (white box)
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 700px;
        max-height: 80vh;
        overflow: auto;
        position: relative;
    `;
    
    // Create pre-formatted text block for BibTeX
    const pre = document.createElement('pre');
    pre.style.cssText = `
        background: #f5f5f5;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 0.9em;
    `;
    pre.textContent = bibtex;
    
    // Create Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        margin-top: 15px;
        padding: 8px 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    closeBtn.onclick = () => modal.remove();
    
    // Create Copy to Clipboard button
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.style.cssText = `
        margin-top: 15px;
        margin-left: 10px;
        padding: 8px 20px;
        background: #2ecc71;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    copyBtn.onclick = () => {
        // Use Clipboard API to copy text
        navigator.clipboard.writeText(bibtex).then(() => {
            // Show success feedback
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        });
    };
    
    // Assemble the modal
    content.appendChild(pre);
    content.appendChild(closeBtn);
    content.appendChild(copyBtn);
    modal.appendChild(content);
    
    // Close modal when clicking outside the content area
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // Add modal to page
    document.body.appendChild(modal);
}

/**
 * Generates a BibTeX citation string from a publication entry
 * 
 * Creates a properly formatted BibTeX entry including:
 * - Entry type (e.g., @inproceedings, @article)
 * - Citation key
 * - Common fields: title, author, venue, year, DOI, URL, etc.
 * 
 * Note: This is a simplified version that includes only common fields.
 * The original BibTeX file may have additional custom fields.
 * 
 * @param {Object} entry - Publication entry with BibTeX fields
 * @returns {string} Formatted BibTeX citation
 */
function generateBibtex(entry) {
    let bibtex = `@${entry.type}{${entry.key},\n`;
    
    // List of standard BibTeX fields to include
    const fields = ['title', 'author', 'booktitle', 'journal', 'year', 'month', 
                   'volume', 'number', 'pages', 'publisher', 'doi', 'url'];
    
    // Add each field if it exists in the entry
    fields.forEach(field => {
        if (entry[field]) {
            bibtex += `  ${field} = {${entry[field]}},\n`;
        }
    });
    
    bibtex += '}';
    return bibtex;
}

// Initialize: Load publications when the page finishes loading
// This ensures the DOM is ready before we try to access elements
document.addEventListener('DOMContentLoaded', loadPublications);
