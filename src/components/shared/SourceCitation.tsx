interface SourceCitationProps {
  url: string;
  sourceName: string;
  date?: string;
}

export default function SourceCitation({ url, sourceName, date }: SourceCitationProps) {
  return (
    <span className="text-xs text-muted">
      Source:{" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground transition"
      >
        {sourceName}
      </a>
      {date && <span> ({date})</span>}
    </span>
  );
}
