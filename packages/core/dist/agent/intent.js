export async function detectIntent(input) {
    if (input.goal === "tests" || input.goal === "docs")
        return input.goal;
    return "review";
}
