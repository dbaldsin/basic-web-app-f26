import GameQueries from "./GameQueries";

export default function QueryProcessor(query: string): string {
  const gameAnswer = GameQueries(query);
  if (gameAnswer !== undefined) return gameAnswer;

  if (query.toLowerCase().includes("what is your andrew id")) {
    return "dbaldsin";
  }

  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Dion";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}
