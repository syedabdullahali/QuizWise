export default function HandleRecommendation(input: {
    goal?: string;
    experience?: string;
    time?: string;
    style?: string;
    focus?: string;
    name?: string;
}) {
    const lines: string[] = [];
    const name = input.name || "there";

    lines.push(`Hi ${ name }, thanks for sharing your answers! Here’s a personalized plan for you:`);

    if (input.goal === "Learn JS")
        lines.push("We'll begin with a 4-week track to cover JavaScript fundamentals step by step.");
    else if (input.goal === "Get a job")
        lines.push("We’ll focus on building portfolio projects and preparing for technical interviews.");
    else if (input.goal === "Improve DS/Algo")
        lines.push("Daily problem practice and weekly contests will help sharpen your data structures and algorithms skills.");
    else if (input.goal === "Build a project")
        lines.push("A scoped app is a great idea — we’ll aim to ship a working MVP in about 2 weeks.");

    if (input.experience === "Beginner")
        lines.push("Since you’re starting out, we’ll keep sessions short and consistent to build momentum.");
    else if (input.experience === "Advanced")
        lines.push("With your experience, we’ll dive into advanced patterns and system design concepts.");

    if (input.time)
        lines.push(`You mentioned having ${ input.time } each week, so we’ll plan around that schedule.`);

    if (input.style === "Hands-on")
        lines.push("Most of the plan will involve practical coding exercises rather than theory.");
    else if (input.style === "Mentorship")
        lines.push("We’ll include regular mentor check-ins so you get feedback along the way.");

    if (input.focus)
        lines.push(`Your primary track will center around ${ input.focus }.`);

    lines.push("You’ll also get a copy of this plan by email for easy reference.");
    return lines.join(" ");
}
