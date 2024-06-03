/** @format */
export interface HeadingData {
  title: string;
  level: number;
}

export function extractMdxHeadings(mdxContent: string): Array<HeadingData> {
  const headings: Array<HeadingData> = [];

  // match the `#` syntax for headings
  // const regexPattern = /^(#{2,3})\s+(.+)(?=\r|\n)$/gm;
  const headingMatcher = /^(#+)\s(.+)$/gm;
  let match = headingMatcher.exec(mdxContent);

  while (match !== null) {
    const level = match[1].length;
    const title = match[2].trim();

    if (level === 2 || level === 3) {
      // record this heading
      headings.push({ title, level });
    }

    // get next match
    match = headingMatcher.exec(mdxContent);
  }

  return headings;
}
