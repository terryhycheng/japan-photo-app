import React from "react";
import { z } from "zod";

const judgeFormOtherSchema = z.object({
  score: z.record(z.array(z.number())),
  comment: z.string(),
});
export type JudgeFormOtherSchema = z.infer<typeof judgeFormOtherSchema>;

const JudgeFormOther = () => {
  return <div>JudgeFormOther</div>;
};

export default JudgeFormOther;
