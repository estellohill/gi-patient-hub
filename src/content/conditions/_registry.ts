import type { ConditionMeta } from "../types";

import colonoscopyMeta from "./colonoscopy/meta.json";
import gerdMeta from "./gerd/meta.json";
import ibsMeta from "./ibs/meta.json";
import hPyloriMeta from "./h-pylori/meta.json";
import crohnsMeta from "./crohns-disease/meta.json";
import ucMeta from "./ulcerative-colitis/meta.json";
import celiacMeta from "./celiac-disease/meta.json";
import masldMeta from "./masld/meta.json";
import dyspepsiaMeta from "./dyspepsia/meta.json";
import barrettsMeta from "./barretts-esophagus/meta.json";
import cirrhosisMeta from "./cirrhosis/meta.json";
import hepBMeta from "./hepatitis-b/meta.json";
import hepCMeta from "./hepatitis-c/meta.json";
import pancreatititsMeta from "./acute-pancreatitis/meta.json";
import giBleedingMeta from "./gi-bleeding/meta.json";
import upperEndoscopyMeta from "./upper-endoscopy/meta.json";
import diverticularMeta from "./diverticular-disease/meta.json";
import hemorrhoidsMeta from "./hemorrhoids/meta.json";
import constipationMeta from "./chronic-constipation/meta.json";
import gallstonesMeta from "./gallstones/meta.json";
import eoeMeta from "./eosinophilic-esophagitis/meta.json";
import cDiffMeta from "./c-difficile/meta.json";
import gastroparesisMeta from "./gastroparesis/meta.json";
import achalasiaMeta from "./achalasia/meta.json";
import microscopicColitisMeta from "./microscopic-colitis/meta.json";
import chronicDiarrheaMeta from "./chronic-diarrhea/meta.json";
import chronicPancMeta from "./chronic-pancreatitis/meta.json";
import colonPolypsMeta from "./colon-polyps/meta.json";
import pbcMeta from "./primary-biliary-cholangitis/meta.json";
import ercpMeta from "./ercp/meta.json";
import paracentesisMeta from "./paracentesis/meta.json";
import aihMeta from "./autoimmune-hepatitis/meta.json";
import hemochromatosisMeta from "./hemochromatosis/meta.json";
import pscMeta from "./primary-sclerosing-cholangitis/meta.json";
import capsuleMeta from "./capsule-endoscopy/meta.json";
import fibroscanMeta from "./fibroscan/meta.json";
import liverBiopsyMeta from "./liver-biopsy/meta.json";
import fitTestMeta from "./fit-test/meta.json";

export const conditions: ConditionMeta[] = [
  colonoscopyMeta as ConditionMeta,
  gerdMeta as ConditionMeta,
  ibsMeta as ConditionMeta,
  hPyloriMeta as ConditionMeta,
  crohnsMeta as ConditionMeta,
  ucMeta as ConditionMeta,
  celiacMeta as ConditionMeta,
  masldMeta as ConditionMeta,
  dyspepsiaMeta as ConditionMeta,
  barrettsMeta as ConditionMeta,
  cirrhosisMeta as ConditionMeta,
  hepBMeta as ConditionMeta,
  hepCMeta as ConditionMeta,
  pancreatititsMeta as ConditionMeta,
  giBleedingMeta as ConditionMeta,
  upperEndoscopyMeta as ConditionMeta,
  diverticularMeta as ConditionMeta,
  hemorrhoidsMeta as ConditionMeta,
  constipationMeta as ConditionMeta,
  gallstonesMeta as ConditionMeta,
  eoeMeta as ConditionMeta,
  cDiffMeta as ConditionMeta,
  gastroparesisMeta as ConditionMeta,
  achalasiaMeta as ConditionMeta,
  microscopicColitisMeta as ConditionMeta,
  chronicDiarrheaMeta as ConditionMeta,
  chronicPancMeta as ConditionMeta,
  colonPolypsMeta as ConditionMeta,
  pbcMeta as ConditionMeta,
  ercpMeta as ConditionMeta,
  paracentesisMeta as ConditionMeta,
  aihMeta as ConditionMeta,
  hemochromatosisMeta as ConditionMeta,
  pscMeta as ConditionMeta,
  capsuleMeta as ConditionMeta,
  fibroscanMeta as ConditionMeta,
  liverBiopsyMeta as ConditionMeta,
  fitTestMeta as ConditionMeta,
].filter((c) => c.enabled);

export const conditionSlugs = conditions.map((c) => c.slug);
