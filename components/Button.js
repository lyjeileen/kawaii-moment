export default function Button(props) {
  return (
    <button
      className="border rounded-full py-1 px-3 m-2 font-bold text-amber-800 bg-[#FAEAB1] hover:shadow-md"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
