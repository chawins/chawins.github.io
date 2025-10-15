/**
 * Simple BibTeX parser for extracting publication information
 */

class BibtexParser {
    constructor(bibtexString) {
        this.bibtexString = bibtexString;
        this.entries = [];
    }

    parse() {
        // Remove comments and front matter
        let content = this.bibtexString.replace(/^---[\s\S]*?---/m, '');
        
        // Match all BibTeX entries
        const entryRegex = /@(\w+)\s*\{\s*([^,]+)\s*,\s*([\s\S]*?)\n\}/g;
        let match;

        while ((match = entryRegex.exec(content)) !== null) {
            const [, type, key, fields] = match;
            const entry = this.parseFields(fields);
            entry.type = type.toLowerCase();
            entry.key = key.trim();
            this.entries.push(entry);
        }

        return this.entries;
    }

    parseFields(fieldsString) {
        const fields = {};
        
        // Match field = {value} or field = "value" or field = barevalue
        // Updated regex to handle multiple levels of nested braces AND bare values
        const fieldRegex = /(\w+)\s*=\s*\{((?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*)\}|(\w+)\s*=\s*"([^"]*)"|(\w+)\s*=\s*([^,}\s]+)/g;
        let match;

        while ((match = fieldRegex.exec(fieldsString)) !== null) {
            const fieldName = (match[1] || match[3] || match[5]).toLowerCase();
            const fieldValue = (match[2] || match[4] || match[6]).trim();
            fields[fieldName] = this.cleanValue(fieldValue);
        }

        return fields;
    }

    cleanValue(value) {
        // Remove extra whitespace and newlines
        value = value.replace(/\s+/g, ' ').trim();
        
        // Handle LaTeX math mode asterisk for equal contribution (before removing braces)
        value = value.replace(/\{\$\{\*\}\$\}/g, '*');
        
        // Remove LaTeX commands (basic cleanup)
        value = value.replace(/\\textcopyright\{\}/g, '©');
        value = value.replace(/\{\\text([a-z]+)\}/g, '$1');
        value = value.replace(/\\text([a-z]+)\{([^}]*)\}/g, '$2');
        value = value.replace(/\{\{([^}]*)\}\}/g, '$1');
        value = value.replace(/\{([^}]*)\}/g, '$1');
        value = value.replace(/``/g, '"');
        value = value.replace(/''/g, '"');
        value = value.replace(/---/g, '—');
        value = value.replace(/--/g, '–');
        value = value.replace(/\\&/g, '&');
        value = value.replace(/\\\$/g, '$');
        value = value.replace(/~/g, ' ');
        
        // Handle special characters
        value = value.replace(/\\'e/g, 'é');
        value = value.replace(/\\`e/g, 'è');
        
        return value;
    }

    getEntriesByYear() {
        const byYear = {};
        
        this.entries.forEach(entry => {
            const year = entry.year || 'Unknown';
            if (!byYear[year]) {
                byYear[year] = [];
            }
            byYear[year].push(entry);
        });

        // Sort years in descending order
        const sortedYears = Object.keys(byYear).sort((a, b) => {
            if (a === 'Unknown') return 1;
            if (b === 'Unknown') return -1;
            return parseInt(b) - parseInt(a);
        });

        // Month name to number mapping for sorting
        const monthMap = {
            'jan': 1, 'january': 1,
            'feb': 2, 'february': 2,
            'mar': 3, 'march': 3,
            'apr': 4, 'april': 4,
            'may': 5,
            'jun': 6, 'june': 6,
            'jul': 7, 'july': 7,
            'aug': 8, 'august': 8,
            'sep': 9, 'september': 9,
            'oct': 10, 'october': 10,
            'nov': 11, 'november': 11,
            'dec': 12, 'december': 12
        };

        const result = [];
        sortedYears.forEach(year => {
            // Sort entries within each year by month (descending - newest first)
            const sortedEntries = byYear[year].sort((a, b) => {
                const monthA = a.month ? (monthMap[a.month.toLowerCase()] || 13) : 13;
                const monthB = b.month ? (monthMap[b.month.toLowerCase()] || 13) : 13;
                return monthB - monthA; // Descending: larger month number first
            });
            
            result.push({
                year: year,
                entries: sortedEntries
            });
        });

        return result;
    }
}
