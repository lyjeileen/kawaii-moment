import Button from 'components/Button';

export default function Utils() {
  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl text-amber-800 p-2 my-10">Utils</h2>
      <div>
        <Button
          text="Generate content"
          onClick={async () => {
            await fetch('/api/utils', {
              body: JSON.stringify({
                task: 'generate_content',
              }),
              headers: { 'Content-Type': 'application/json' },
              method: 'POST',
            });
          }}
        />
      </div>
      <div>
        <Button
          text="Clear database"
          onClick={async () => {
            await fetch('/api/utils', {
              body: JSON.stringify({
                task: 'clear_database',
              }),
              headers: { 'Content-Type': 'application/json' },
              method: 'POST',
            });
          }}
        />
      </div>
    </div>
  );
}
