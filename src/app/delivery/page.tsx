import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";

export default async function Delivery() {
  const deliveryPage = await getPageByName("delivery");

  if (!deliveryPage) {
    return <div>דף המשלוחים לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(deliveryPage.id);
  console.log(contentBlocks);

  // const mainText = contentBlocks.find(
  //   (block) => block.block_type === "text"
  // )?.content;

  // const deliveryAreas = contentBlocks.find(
  //   (block) => block.block_type === "delivery_areas"
  // )?.content;

  // const deliveryOptions = contentBlocks.find(
  //   (block) => block.block_type === "delivery_options"
  // )?.content;

  // const deliveryTimes = contentBlocks.find(
  //   (block) => block.block_type === "delivery_times"
  // )?.content;

  // const guidelines = contentBlocks.find(
  //   (block) => block.block_type === "guidelines"
  // )?.content;

  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        {deliveryPage.title || "משלוחים"}
      </h1>
      <p className="text-center text-gray-600 mb-12 text-2xl">
        {deliveryPage.description}
      </p>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          אזורי משלוח
        </h2>
        <p className="text-gray-600 mb-6">
          אנו מספקים משלוחים לאזורים הבאים: פרדס חנה, חדרה, קיסריה, חיפה
          והקריות. אם אינכם בטוחים אם אנחנו מגיעים לאזור שלכם, אנא צרו איתנו
          קשר.
        </p>

        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          אפשרויות משלוח
        </h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>משלוח מהיר (עד 24 שעות) - 50 ₪</li>
          <li>משלוח רגיל (עד 3 ימי עסקים) - 30 ₪</li>
          <li>איסוף עצמי ללא עלות מהחווה בפרדס חנה</li>
        </ul>

        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          זמני אספקה
        </h2>
        <p className="text-gray-600 mb-6">
          זמני האספקה שלנו הם בימים א&apos;-ה&apos; בין השעות 9:00-17:00. הזמנות
          שמתקבלות לאחר השעה 17:00 יסופקו ביום העסקים הבא.
        </p>

        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          הנחיות ותנאים
        </h2>
        <p className="text-gray-600">
          אנא ודאו כי הכתובת למשלוח מלאה ומדויקת. במידה ויש בעיה במשלוח או שאלה,
          אל תהססו לפנות אלינו. אנו כאן לשירותכם!
        </p>
      </div>
    </section>
  );
}
