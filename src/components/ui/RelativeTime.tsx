import { formatDistanceToNow } from 'date-fns';

export default function RelativeTime({
  dateString,
  prefix = '',
}: {
  dateString: string;
  prefix?: string;
}) {
  const date = new Date(dateString);
  const relative = formatDistanceToNow(date, { addSuffix: true });
  return (
    <time
      dateTime={dateString}
      title={date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    >
      {prefix}{relative}
    </time>
  );
}
