export default function handler(req, res) {
    const { pattern } = req.query;
  
    // Match the pattern xdy+z
    const match = pattern.match(/^(\d+)d(\d+)\+(\d+)$/);
    if (!match) {
      res.setHeader("Content-Type", "text/html");
      res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta property="og:title" content="Dice Roll Error">
            <meta property="og:description" content="Invalid dice roll format">
            <title>Dice Roll Error</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background-color: #f5f5f5;
              }
              h1 {
                color: #dc3545;
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
            </style>
          </head>
          <body>
            <h1>Invalid format. Please use /xdy+z format.</h1>
          </body>
        </html>
      `);
      return;
    }
  
    // Extract x, y, and z
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    const z = parseInt(match[3], 10);
  
    // Generate random dice rolls
    const rolls = Array.from({ length: x }, () => Math.floor(Math.random() * y) + 1);
  
    // Calculate the sum
    const sum = rolls.reduce((acc, val) => acc + val, 0) + z;
  
    // Create a descriptive title
    const title = `Rolling ${x}d${y}+${z}`;
    const description = `Result: ${sum} (Rolls: [${rolls.join(", ")}] + ${z})`;
  
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
          <meta property="og:type" content="website">
          <meta name="twitter:card" content="summary">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${description}">
          <title>${title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .result {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #2c3e50;
              margin-bottom: 1rem;
            }
            .formula {
              color: #666;
              font-size: 1.2rem;
            }
          </style>
        </head>
        <body>
          <div class="result">
            <h1>${sum}</h1>
            <div class="formula">[${rolls.join(", ")}] + ${z}</div>
          </div>
        </body>
      </html>
    `);
  }