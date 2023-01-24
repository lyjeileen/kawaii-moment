import Button from 'components/Button';
export default function Utils() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-amber-800 p-2 my-10">Utils</h2>
      <div>
        <Button text="Generate content" />
      </div>
      <div>
        <Button text="Clear database" />
      </div>
    </div>
  );
}
