#!/bin/bash

# The Missing Guides - Push to GitHub
# Repo: https://github.com/Bridgette013/The_Missing_Guides

echo "🚀 Pushing The Missing Guides to GitHub..."
echo ""

cd /home/claude/the-missing-guides

# Check if we have commits
if git log --oneline 2>/dev/null | grep -q "Initial commit"; then
    echo "✅ Git repository ready"
    echo "✅ Commits found"
    echo ""
    
    # Show what we're about to push
    echo "📦 Files to push:"
    git ls-files | head -20
    echo "... and more"
    echo ""
    
    # Push to GitHub
    echo "⬆️  Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ SUCCESS! Code pushed to GitHub"
        echo ""
        echo "🔗 View your repo:"
        echo "   https://github.com/Bridgette013/The_Missing_Guides"
        echo ""
        echo "📋 NEXT STEPS:"
        echo "   1. Go to https://app.netlify.com"
        echo "   2. Click 'Add new site' → 'Import from Git'"
        echo "   3. Select your repo: The_Missing_Guides"
        echo "   4. Deploy settings auto-detected ✨"
        echo "   5. Add environment variables"
        echo "   6. Connect domain: themissingguides.com"
        echo ""
    else
        echo ""
        echo "❌ Push failed. You may need to authenticate with GitHub."
        echo ""
        echo "💡 OPTIONS:"
        echo ""
        echo "OPTION A - Use Personal Access Token:"
        echo "   1. Go to: https://github.com/settings/tokens"
        echo "   2. Generate new token (classic)"
        echo "   3. Check: repo (all)"
        echo "   4. Copy token"
        echo "   5. Run: git push -u origin main"
        echo "   6. Username: Bridgette013"
        echo "   7. Password: [paste token]"
        echo ""
        echo "OPTION B - Download tarball and push from your computer:"
        echo "   I already created the tarball in /mnt/user-data/outputs/"
        echo ""
    fi
else
    echo "❌ No git commits found"
fi
