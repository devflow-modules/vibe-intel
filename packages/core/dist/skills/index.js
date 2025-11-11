import * as CodeReview from "./code_review.js";
export const skills = {
    review: CodeReview.execute,
    tests: async (ctx) => {
        // placeholder
        return { summary: "tests not implemented yet", goal: ctx.input.goal };
    },
    docs: async (ctx) => {
        // placeholder
        return { summary: "docs not implemented yet", goal: ctx.input.goal };
    }
};
