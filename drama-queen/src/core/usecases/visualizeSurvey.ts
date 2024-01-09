import { assert } from "tsafe/assert";
import type { Thunks } from "core/bootstrap";
import { isQueenV2Survey } from "core/checkLunaticVersion/isQueenV2Survey";
import axios from "axios";
import { Questionnaire } from "core/model";

export const name = "visualizeSurvey";

export const reducer = null;

const lunaticModelVersionBreaking = "2.2.10";

const semverCompare = new Intl.Collator("en", { numeric: true }).compare;

export const thunks = {
  isQueenV2Survey:
    (params: { questionnaireUrl: string }) =>
    async (...args): Promise<boolean> => {
      const { questionnaireUrl } = params;
      const { lunaticModelVersion } = await axios
        .create({
          headers: {
            Accept: "application/json;charset=utf-8",
          },
        })
        .get<Questionnaire>(questionnaireUrl)
        .then(({ data }) => data);

      if (lunaticModelVersion === undefined) {
        console.info(
          "The survey has no lunaticModelVersion field, so by default we redirect to queen v2"
        );
        return true;
      }

      return (
        semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
      );
    },
} satisfies Thunks;
