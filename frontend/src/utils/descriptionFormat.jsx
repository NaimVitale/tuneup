export const formatDescription = (text, boldWords = []) => {
  if (!text) return null;

  return (
    <div>
      {text.split('\n').map((line, i) => {
        let formattedLine = line;
        boldWords.forEach(word => {
          if (!word) return;
          const regex = new RegExp(`(${word})`, 'gi');
          formattedLine = formattedLine.replace(regex, '<strong>$1</strong>');
        });

        return (
          <p key={i} className="mb-2 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      })}
    </div>
  );
};