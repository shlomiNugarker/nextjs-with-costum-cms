export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-center p-4">
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-customPeach border-t-customNavy rounded-full animate-spin"></div>
      </div>
      <p className="text-2xl font-semibold text-customNavy mt-4">
        טוען את התוכן... אנא המתן
      </p>
    </div>
  );
}
