export async function detectIntent(input) {
    if (["review", "tests", "docs"].includes(input.goal)) {
        return input.goal;
    }
    return "default";
}
