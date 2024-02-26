import { FormEvent, useEffect, useState } from "react";
import moment from "moment-timezone";

import { formatDateAndTime } from "../../utils/formatDateAndTime";

interface IFormData {
  text: string;
  timezone: string;
}

const Home = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [resultText, setResultText] = useState<string>();

  const [formData, setFormData] = useState<IFormData>({
    text: "",
    timezone: "",
  });

  useEffect(() => {
    const fetchTimezones = () => {
      const timezones = moment.tz.names();
      setTimezones(timezones);
    };

    fetchTimezones();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultText(formatDateAndTime(formData.text, formData.timezone));
  };

  return (
    <div className="home">
      <div>Practical Assignment</div>

      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <input
          type="text"
          value={formData.text}
          placeholder="Type text"
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />

        <label htmlFor="cars">Choose a timezone:</label>
        <select
          id="timezone"
          name="timezone"
          onChange={(e) =>
            setFormData({ ...formData, timezone: e.target.value })
          }
        >
          {timezones.map((timezone, index) => (
            <option key={index} value={timezone}>
              {timezone}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
      {resultText && <div className="result">{JSON.stringify(resultText)}</div>}
    </div>
  );
};

export default Home;
