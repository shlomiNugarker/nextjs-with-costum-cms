import { SubmitButton } from "@/cmps/submit-button";

type ContactProps = {
  title: string;
  description: string;
  action: (formData: FormData) => Promise<void>;
};

export const Contact: React.FC<ContactProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <section className="p-5" id="contact">
      <div className="lg:py-16 px-6 mx-auto max-w-screen-md bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12 text-2xl">
          {description}
        </p>
        <form action={action}>
          <div className="space-y-6">
            <div>
              <label
                className="block text-xl font-medium text-customNavy mb-2"
                htmlFor="name"
              >
                שם
              </label>
              <input
                type="text"
                id="name"
                name="name"
                aria-label="Name"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                placeholder="הזן את שמך"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-customNavy mb-2"
              >
                דוא&quot;ל
              </label>
              <input
                type="email"
                id="email"
                name="email"
                aria-label="Email"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                placeholder="הכנס את האימייל שלך"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xl font-medium text-customNavy mb-2"
              >
                הודעה
              </label>
              <textarea
                id="message"
                name="message"
                aria-label="Message"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen transition"
                placeholder="כתוב את הודעתך כאן"
                rows={6}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <SubmitButton
                aria-label="Submit message"
                className="mt-4 px-8 py-4 text-white bg-customGreen rounded-md hover:bg-green-600 transition"
              >
                שלח הודעה
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
