const fs = require('fs');

const html = fs.readFileSync('shubhlagn_homepage.html', 'utf8');

function extractVar(varName) {
  const marker = varName + ' = ';
  const startIdx = html.indexOf(marker);
  if (startIdx === -1) {
    console.log('Marker not found:', varName);
    return null;
  }
  const codeStart = startIdx + marker.length;
  // find matching end or next script tag
  // We can wrap it in an eval context safely
  // let's isolate up to the semicolon or next script tag
  let scriptEnd = html.indexOf('</script>', codeStart);
  let snippet = html.substring(codeStart, scriptEnd).trim();
  if (snippet.endsWith(';')) snippet = snippet.slice(0, -1);
  
  try {
    const fn = new Function('return (' + snippet + ');');
    return fn();
  } catch (err) {
    console.error('Eval error for ' + varName + ':', err.message);
    return null;
  }
}

const serverAppState = extractVar('window.__SERVER_APP_STATE__');
if (serverAppState) {
  fs.writeFileSync('server_app_state.json', JSON.stringify(serverAppState, null, 2));
  console.log('Successfully wrote server_app_state.json');
}

const preloadedState = extractVar('window.__PRELOADED_STATE__');
if (preloadedState) {
  fs.writeFileSync('preloaded_state.json', JSON.stringify(preloadedState, null, 2));
  console.log('Successfully wrote preloaded_state.json');
}

const themeSettings = extractVar('window.__THEME_SETTINGS__');
if (themeSettings) {
  fs.writeFileSync('theme_settings.json', JSON.stringify(themeSettings, null, 2));
  console.log('Successfully wrote theme_settings.json');
}

