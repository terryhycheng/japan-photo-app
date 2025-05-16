import React from "react";
import { Slider } from "@repo/ui/components/slider";
import { Textarea } from "@repo/ui/components/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { z } from "zod";
import { SaveIcon } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import { onJudgeFormMainSubmit } from "../data/forms";

const criterias: {
  id: string;
  name: string;
  max: number;
  type: "basic" | "theme";
}[] = [
  {
    id: "1",
    name: "恰當角度",
    max: 10,
    type: "basic",
  },
  {
    id: "2",
    name: "光線運用",
    max: 10,
    type: "basic",
  },
  {
    id: "3",
    name: "構圖",
    max: 10,
    type: "basic",
  },
  {
    id: "4",
    name: "感染力",
    max: 30,
    type: "theme",
  },
  {
    id: "5",
    name: "創意性",
    max: 25,
    type: "theme",
  },
  {
    id: "6",
    name: "主題清晰",
    max: 20,
    type: "theme",
  },
  {
    id: "7",
    name: "拍攝時機",
    max: 25,
    type: "theme",
  },
];

const judgeFormMainSchema = z.object({
  score: z.record(z.array(z.number())),
  comment: z.string(),
});
export type JudgeFormMainSchema = z.infer<typeof judgeFormMainSchema>;

const JudgeFormMain = ({ photoId }: { photoId: string }) => {
  const defaultScore = criterias.reduce(
    (acc, criteria) => {
      acc[criteria.name] = [0];
      return acc;
    },
    {} as Record<string, number[]>,
  );

  const form = useForm<z.infer<typeof judgeFormMainSchema>>({
    defaultValues: {
      score: defaultScore,
      comment: "",
    },
  });

  const onSubmit = (data: z.infer<typeof judgeFormMainSchema>) => {
    onJudgeFormMainSubmit({ data, photoId });
  };

  return (
    <Form {...form}>
      <form className="text-main" onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="text-main text-3xl">拍攝基礎</h3>
        <div className="mt-4 mb-6 space-y-8">
          {criterias
            .filter((criteria) => criteria.type === "basic")
            .map((criteria) => (
              <div key={criteria.id}>
                <h4 className="font-kiwimaru mb-3 text-lg">{criteria.name}</h4>
                <FormField
                  control={form.control}
                  name={`score.${criteria.name}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          className="flex-1"
                          min={0}
                          max={criteria.max}
                          step={1}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
        </div>
        <h3 className="text-main text-3xl">主題相關</h3>
        <div className="mt-4 mb-6 space-y-4">
          {criterias
            .filter((criteria) => criteria.type === "theme")
            .map((criteria) => (
              <div key={criteria.id}>
                <h4 className="font-kiwimaru mb-3 text-lg">{criteria.name}</h4>
                <FormField
                  control={form.control}
                  name={`score.${criteria.name}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          className="flex-1"
                          min={0}
                          max={criteria.max}
                          step={1}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
        </div>
        <h3 className="text-main text-3xl">評語</h3>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="font-kiwimaru text-main h-48 flex-1 border-transparent bg-white/20"
                    placeholder="請在此輸入評語"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <CustomButton
            isWhiteText
            text="更新評分"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            colour="var(--main-color)"
            icons={{ IconLeft: SaveIcon }}
          />
        </div>
      </form>
    </Form>
  );
};

export default JudgeFormMain;
