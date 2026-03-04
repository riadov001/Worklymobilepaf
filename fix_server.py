import sys

with open('server/routes.ts', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    # Fix the duplicate app.get("/api/quotes"
    if 'app.get("/api/quotes", async (req: Request, res: Response) => {' in line:
        if i > 0 and '});' in lines[i-1]:
            # This is the broken one
            continue
    
    # Fix missing try block in app.get("/api/quotes"
    if 'app.get("/api/quotes", async (req: Request, res: Response) => {' in line:
        new_lines.append(line)
        if 'try {' not in lines[i+1]:
            new_lines.append('    const headers = getAuthHeaders(req);\n')
            new_lines.append('    const userCookie = req.headers["cookie"] || "";\n')
            new_lines.append('    try {\n')
        continue
        
    new_lines.append(line)

with open('server/routes.ts', 'w') as f:
    f.writelines(new_lines)
