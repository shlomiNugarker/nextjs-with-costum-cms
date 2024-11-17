export const List = ({ listItems }: { listItems: string[] }) => {
  return (
    <div className="flex my-3">
      <ul className="list-disc list-inside text-gray-600 space-y-3 mx-auto flex flex-col items-start">
        {listItems.map((item, index) => (
          <li key={index} className="text-2xl">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
