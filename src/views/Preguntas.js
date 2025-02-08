import { useEffect, useState } from "react";
import TopicService from "../services/TopicService";

export default function TopicListComponent() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicService.getAllTopics();
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Topics</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id} className="p-2 border-b">{topic.name}</li>
        ))}
      </ul>
    </div>
  );
}
