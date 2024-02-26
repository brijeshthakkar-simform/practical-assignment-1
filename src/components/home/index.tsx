import { FormEvent, useState } from "react";
import moment from "moment-timezone";

import { formatDateAndTime } from "../../utils/formatDateAndTime";

interface IFormData {
  text: string;
  timezone: string;
}

const Home = () => {
  const timezones = moment.tz.names();
  const [resultText, setResultText] = useState<string>();

  const [formData, setFormData] = useState<IFormData>({
    text: "",
    timezone: "Africa/Abidjan",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultText(formatDateAndTime(formData.text, formData.timezone));
  };

  return (
    <div className="home">
      <div>Practical Assignment</div>

      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="input-wrapper">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            value={formData.text}
            placeholder="Type text"
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
        </div>

        <div className="select-wrapper">
          <label htmlFor="timezone">Choose a timezone:</label>
          <select
            id="timezone"
            name="timezone"
            onChange={(e) =>
              setFormData({ ...formData, timezone: e.target.value })
            }
          >
            {timezones?.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className="result">{resultText}</div>
    </div>
  );
};

export default Home;
