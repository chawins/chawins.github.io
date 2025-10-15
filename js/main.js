async function renderBib() {
    console.log("Starting renderBib");
    try {
        const response = await fetch('publications.bib');
        console.log("Fetch response:", response);
        if (!response.ok) {
            console.error("Failed to fetch publications.bib:", response.statusText);
            document.getElementById('bib-container').innerHTML = `<p>Error: Could not load publications.bib. Status: ${response.statusText}</p>`;
            return;
        }
        const bibtex = await response.text();
        console.log("BibTeX content loaded:", bibtex.substring(0, 100) + "...");

        console.log("Initializing citation-js with:", bibtex.substring(0, 100) + "...");
        const cite = new Cite(bibtex);
        console.log("citation-js object created:", cite);

        const html = cite.format('bibliography', {
            format: 'html',
            template: 'apa',
            lang: 'en-US'
        });
        console.log("HTML generated:", html.substring(0, 100) + "...");

        document.getElementById('bib-container').innerHTML = html;
        console.log("Finished renderBib");
    } catch (e) {
        console.error("Error in renderBib:", e);
        document.getElementById('bib-container').innerHTML = "<p>An error occurred while rendering publications. Please check the browser console.</p>";
    }
}

renderBib();