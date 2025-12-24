#!/usr/bin/env node

/**
 * Script to scan documentation for potential abbreviations and acronyms
 * that might need to be added to the Abbreviations.md file
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'website', 'docs');
const ABBREVIATIONS_FILE = path.join(DOCS_DIR, '01_Core_Concepts', 'Abbreviations.md');

// Regex patterns to find potential abbreviations
const ABBREV_PATTERNS = [
  /\b[A-Z]{3,}\b/g,  // Words with 3+ uppercase letters (more selective)
  /\b[A-Z][a-z]+[A-Z][a-z]*\b/g,  // CamelCase with at least 2 capital letters
];

// Additional exclusions for common short forms that aren't abbreviations
const ADDITIONAL_EXCLUDE = new Set([
  'CD', 'CI', 'HEAD', 'NET', 'README', 'VS'
]);

// Known abbreviations already in the file (to avoid duplicates)
// This will be updated dynamically by reading the current file
let KNOWN_ABBREVIATIONS = new Set([
  '.NET', 'AAA', 'API', 'AWS', 'BDD', 'BaaS', 'Branch', 'Build', 'CD', 'CI', 'CI/CD', 'CSS', 'Commit', 'DOM', 'Deploy', 'Docusaurus', 'Firebase', 'Git', 'GitHub', 'HEAD', 'HTML', 'IaaS', 'JSON', 'JSX', 'JavaScript', 'Lint', 'Merge', 'NET', 'Node.js', 'PWA', 'PaaS', 'Props', 'Pull Request', 'README', 'REST', 'React', 'Refactor', 'Repository', 'SQL', 'SSR', 'SaaS', 'TDD', 'TypeScript', 'UI', 'VS', 'VS Code', 'XML', 'npm', 'useContext', 'useEffect', 'useReducer', 'useState'
]);

function loadKnownAbbreviations() {
  KNOWN_ABBREVIATIONS = new Set(); // Reset the set
  try {
    const content = fs.readFileSync(ABBREVIATIONS_FILE, 'utf8');
    const lines = content.split('\n');

    lines.forEach(line => {
      // Match lines like "- **TERM**: definition"
      const match = line.match(/^\s*-\s*\*\*([^*]+)\*\*/);
      if (match) {
        KNOWN_ABBREVIATIONS.add(match[1].trim());
      }
    });
  } catch (error) {
    console.warn('Could not load existing abbreviations:', error.message);
  }
}

function addAbbreviationsToFile(newAbbreviations) {
  try {
    let content = fs.readFileSync(ABBREVIATIONS_FILE, 'utf8');

    // Filter out abbreviations that already exist
    const trulyNewAbbreviations = newAbbreviations.filter(abbr => !KNOWN_ABBREVIATIONS.has(abbr));

    if (trulyNewAbbreviations.length === 0) {
      console.log('ℹ️ All found abbreviations already exist in the file.');
      return;
    }

    // Group new abbreviations by their first letter
    const grouped = {};
    trulyNewAbbreviations.forEach(abbr => {
      const firstLetter = abbr.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(abbr);
    });

    // Add new abbreviations to appropriate sections
    Object.keys(grouped).sort().forEach(letter => {
      const sectionHeader = `### ${letter}`;
      const newEntries = grouped[letter]
        .sort()
        .map(abbr => `- **${abbr}**: [Definition needed]`)
        .join('\n');

      // Find the section and add entries
      const sectionRegex = new RegExp(`(${sectionHeader}\\n(?:.*?)(?=\\n### [A-Z]|\\n## [A-Z]|---|$))`, 's');
      const match = content.match(sectionRegex);

      if (match) {
        // Add to existing section
        const sectionContent = match[1];
        const updatedSection = sectionContent.trim() + '\n' + newEntries + '\n';
        content = content.replace(sectionContent, updatedSection);
      } else {
        // Find Technology Abbreviations section and add new letter section
        const techSectionRegex = /(## Technology Abbreviations.*?(?=## |---|$))/s;
        const techMatch = content.match(techSectionRegex);

        if (techMatch) {
          const insertPoint = techMatch[1].lastIndexOf('\n### ');
          if (insertPoint !== -1) {
            const before = techMatch[1].substring(0, insertPoint);
            const after = techMatch[1].substring(insertPoint);
            const newSection = `\n${sectionHeader}\n\n${newEntries}\n`;
            content = content.replace(techMatch[1], before + newSection + after);
          }
        }
      }
    });

    fs.writeFileSync(ABBREVIATIONS_FILE, content);
    console.log(`✅ Added ${trulyNewAbbreviations.length} new abbreviations to ${ABBREVIATIONS_FILE}`);
  } catch (error) {
    console.error('Error updating abbreviations file:', error.message);
  }
}

function updateScriptKnownAbbreviations(newAbbreviations) {
  // Update the KNOWN_ABBREVIATIONS in this script file
  const scriptContent = fs.readFileSync(__filename, 'utf8');
  const currentSet = Array.from(KNOWN_ABBREVIATIONS).sort();
  const newSet = [...currentSet, ...newAbbreviations].sort();

  const updatedSet = `let KNOWN_ABBREVIATIONS = new Set([\n  '${newSet.join("', '")}'\n]);`;

  const updatedContent = scriptContent.replace(
    /let KNOWN_ABBREVIATIONS = new Set\(\[\s*[\s\S]*?\]\);/,
    updatedSet
  );

  fs.writeFileSync(__filename, updatedContent);
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const found = new Set();

    ABBREV_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          if (!EXCLUDE_WORDS.has(match.toUpperCase()) &&
              !ADDITIONAL_EXCLUDE.has(match) &&
              !KNOWN_ABBREVIATIONS.has(match) &&
              match.length > 1) {
            found.add(match);
          }
        });
      }
    });

    return Array.from(found);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dirPath) {
  const allAbbreviations = new Set();

  function scan(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (path.extname(item) === '.md') {
        const abbreviations = scanFile(fullPath);
        abbreviations.forEach(abbr => allAbbreviations.add(abbr));
      }
    });
  }

  scan(dirPath);
  return Array.from(allAbbreviations).sort();
}

function main() {
  console.log('🔍 Scanning documentation for potential abbreviations...\n');

  // Load current abbreviations from file
  loadKnownAbbreviations();

  const potentialAbbreviations = scanDirectory(DOCS_DIR);

  if (potentialAbbreviations.length === 0) {
    console.log('✅ No new potential abbreviations found!');
    return;
  }

  console.log('📝 Found new abbreviations. Adding to Abbreviations.md...\n');

  // Add new abbreviations to the file
  addAbbreviationsToFile(potentialAbbreviations);

  // Update the script's known abbreviations
  updateScriptKnownAbbreviations(potentialAbbreviations);

  console.log('\n📊 Summary:');
  console.log(`- Added ${potentialAbbreviations.length} new abbreviations`);
  console.log('- Updated script to recognize these terms');
  console.log('\n💡 Next steps:');
  console.log('- Review the added terms in Abbreviations.md');
  console.log('- Replace "[Definition needed]" with proper definitions');
  console.log('- Remove any terms that don\'t need definitions');
}

if (require.main === module) {
  main();
}

module.exports = { scanDirectory, scanFile };