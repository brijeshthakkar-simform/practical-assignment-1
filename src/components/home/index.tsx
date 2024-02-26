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

{
  /* <Dropdown
          value={selectedProfile?.id}
          onChange={handleChange}
          results={results}
          renderItem={(item) => <p>{item.name}</p>}
          onSelect={(item) => setSelectedProfile(item)}
        /> */
}

//   const [results, setResults] = useState<{ id: string; name: string }[]>();

//   const [selectedProfile, setSelectedProfile] = useState<{
//     id: string;
//     name: string;
//   }>();

//   const profiles = [
//     { id: "1", name: "Allie Grater" },
//     { id: "2", name: "Aida Bugg" },
//     { id: "3", name: "Gabrielle" },
//     { id: "4", name: "Grace" },
//     { id: "5", name: "Hannah" },
//     { id: "6", name: "Heather" },
//     { id: "7", name: "John Doe" },
//     { id: "8", name: "Anne Teak" },
//     { id: "9", name: "Audie Yose" },
//     { id: "10", name: "Addie Minstra" },
//     { id: "11", name: "Anne Ortha" },
//   ];

//   const handleChange: changeHandler = (e) => {
//     const { target } = e;
//     if (!target.value.trim()) return setResults([]);

//     const filteredValue = profiles.filter((profile) =>
//       profile.name.toLowerCase().startsWith(target.value)
//     );
//     setResults(filteredValue);
//   };
