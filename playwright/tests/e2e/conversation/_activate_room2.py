import re

path = 'convo-room.spec.js'
with open(path, encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')
total = len(lines)
print("actual total", total)

# Find all test.fixme blocks in range [2000, 3974] (1-indexed), each block runs from its
# `test.fixme(` line to the matching closing `});` at same indent.
fixme_start_re = re.compile(r"^(\s*)test\.fixme\('(\[SIX-Convo-(\d+)\][^']*)',\s*async \(\{ page \}\) => \{\s*$")

# Track current describe block name to pick a body strategy.
describe_re = re.compile(r"^test\.describe\('([^']*)'")

blocks = []  # (start_idx, end_idx, indent, title, id, describe_name) 0-indexed line indices inclusive
current_describe = None
i = 0
while i < total:
    dm = describe_re.match(lines[i])
    if dm:
        current_describe = dm.group(1)
    m = fixme_start_re.match(lines[i])
    if m and (i + 1) >= 2000:  # 1-indexed line i+1
        indent = m.group(1)
        title = m.group(2)
        tcid = int(m.group(3))
        # find closing '});' at same indent
        j = i + 1
        while j < total:
            if lines[j] == indent + '});':
                break
            j += 1
        blocks.append((i, j, indent, title, tcid, current_describe))
        i = j + 1
        continue
    i += 1

print(f"found {len(blocks)} fixme blocks in range")
for b in blocks[:5]:
    print(b[4], b[5], b[3][:60])
print('...')
for b in blocks[-5:]:
    print(b[4], b[5], b[3][:60])
