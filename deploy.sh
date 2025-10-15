#!/bin/bash

# Deployment script for minimalist website
# This script helps you deploy your website to different platforms

echo "🚀 Minimalist Website Deployment Helper"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "publications.html" ]; then
    echo "❌ Error: Please run this script from the minimalist_website directory"
    exit 1
fi

echo "Select deployment option:"
echo "1) Copy for standalone deployment (includes BibTeX file)"
echo "2) Test locally (start HTTP server)"
echo "3) Prepare for GitHub Pages (subdirectory)"
echo "4) Copy profile picture from main site"
echo "5) Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📦 Preparing standalone deployment..."
        mkdir -p deploy
        
        # Copy all essential files
        cp index.html publications.html publications.bib style.css bibtex-parser.js publications.js deploy/
        cp profile.svg deploy/ 2>/dev/null || cp profile.jpg deploy/ 2>/dev/null || cp profile.png deploy/ 2>/dev/null || echo "⚠️  No profile image found"
        cp cv.pdf deploy/ 2>/dev/null || echo "ℹ️  No cv.pdf found (optional)"
        
        echo "✅ Files copied to ./deploy/"
        echo "📝 Upload the contents of ./deploy/ to your web server"
        echo ""
        ;;
    
    2)
        echo ""
        echo "🌐 Starting local HTTP server..."
        echo "📍 Visit: http://localhost:8080"
        echo "📍 Publications: http://localhost:8080/publications.html"
        echo "⏹️  Press Ctrl+C to stop the server"
        echo ""
        echo "💡 Tip: If you see caching issues, do a hard refresh:"
        echo "   • Mac: Cmd+Shift+R"
        echo "   • Windows/Linux: Ctrl+Shift+R"
        echo ""
        python3 -m http.server 8080
        ;;
    
    3)
        echo ""
        echo "📝 Checking GitHub Pages setup..."
        
        # Check if publications.bib exists
        if [ ! -f "publications.bib" ]; then
            echo "⚠️  publications.bib not found!"
            echo ""
            echo "This setup requires publications.bib in the same directory."
            echo "Copy your BibTeX file here:"
            echo ""
            echo "  cp /path/to/your/papers.bib publications.bib"
            echo ""
            exit 1
        fi
        
        # Verify publications.js is using the correct path
        if grep -q "publications.bib" publications.js; then
            echo "✅ publications.js correctly references publications.bib"
        else
            echo "⚠️  Warning: publications.js may not be configured correctly"
            echo "   It should fetch from 'publications.bib'"
        fi
        
        echo ""
        echo "✅ Ready for GitHub Pages!"
        echo ""
        echo "📝 Next steps:"
        echo "   1. Commit your changes:"
        echo "      git add ."
        echo "      git commit -m 'Update minimalist website'"
        echo "      git push"
        echo ""
        echo "   2. Enable GitHub Pages in repository settings"
        echo "   3. Your site will be at:"
        echo "      https://yourusername.github.io/minimalist_website/"
        echo ""
        echo "� For root deployment (yourusername.github.io):"
        echo "   Copy all files to repository root instead"
        echo ""
        ;;
    
    4)
        echo ""
        echo "📸 Copying profile picture from main site..."
        
        if [ -f "../assets/img/profile_pic2.jpg" ]; then
            cp ../assets/img/profile_pic2.jpg profile.jpg
            echo "✅ Copied profile_pic2.jpg as profile.jpg"
            echo "📝 Update index.html to use profile.jpg instead of profile.svg"
        elif [ -f "../assets/img/prof_pic.jpg" ]; then
            cp ../assets/img/prof_pic.jpg profile.jpg
            echo "✅ Copied prof_pic.jpg as profile.jpg"
            echo "📝 Update index.html to use profile.jpg instead of profile.svg"
        else
            echo "⚠️  No profile picture found in ../assets/img/"
            echo "📝 Available images:"
            ls -1 ../assets/img/*.{jpg,png,jpeg} 2>/dev/null | head -5 || echo "   (none found)"
        fi
        echo ""
        ;;
    
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo "✨ Done!"
