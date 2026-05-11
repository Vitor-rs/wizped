export type LessonKind =
  | 'INPUT'
  | 'OUTPUT'
  | 'REVIEW'
  | 'WELCOME'
  | 'WELCOME_BACK'
  | 'CLASSROOM_TALK'
  | 'USEFUL_LANGUAGE'
  | 'REMIND'
  | 'RECALL'

export interface ObjectiveRef {
  id: string
  tagIds: string[]
  description: string
}

export interface ActivityBlueprint {
  id: string
  name: string
  category: 'INDIVIDUAL' | 'PAIR' | 'GROUP' | 'PROJECT' | 'CHECKING_SENTENCES'
  estimatedMinutes?: number
  reusable: boolean
  tags: string[]
}

export interface LessonNode {
  id: string
  index: number
  displayCode: string
  sequenceNumber?: number
  chapterIndex?: number
  kind: LessonKind
  hasHomework: boolean
  objectives: ObjectiveRef[]
  grammarTopics: string[]
  vocabularyTags: string[]
  activityBlueprintIds: string[]
  resourceIds: string[]
  checkingSentencesRef?: string
  metadata?: Record<string, unknown>
}

export interface StageTemplate {
  id: string
  language: string
  courseTrack: 'KIDS' | 'TEENS' | 'W'
  ageRange: { min?: number; max?: number }
  editionYear: number
  sequenceOrder: number
  code: string
  title: string
  previousStageIds: string[]
  nextStageIds: string[]
  chapterStructure: {
    lessonPairsPerChapter: number
    hasReview: boolean
    chapterCount: number
  }
  optionalSpecialLessons: LessonKind[]
  lessons: LessonNode[]
  appSupport: {
    wizMe: boolean
    wizPen: boolean
  }
  cefrBand?: string
  gseRange?: { min: number; max: number }
  tags: string[]
}

export interface DidacticMaterialDocument {
  id: string
  materialType: 'STUDENT_BOOK' | 'WORKBOOK' | 'KIT' | 'SUPPLEMENT' | 'CHECKING_SENTENCES_FILE'
  title: string
  editionYear: number
  stageTemplateId?: string
  barcode?: string
  stockItemId?: string
  tags: string[]
  metadata?: Record<string, unknown>
}

export const baseLessonTypeProfiles: Record<LessonKind, Partial<LessonNode>> = {
  INPUT: { hasHomework: true },
  OUTPUT: { hasHomework: true },
  REVIEW: { hasHomework: true },
  WELCOME: { hasHomework: false },
  WELCOME_BACK: { hasHomework: false },
  CLASSROOM_TALK: { hasHomework: false },
  USEFUL_LANGUAGE: { hasHomework: false },
  REMIND: { hasHomework: false },
  RECALL: { hasHomework: false },
}

export const wizardEnglishStarterTemplates: StageTemplate[] = [
  {
    id: 'stage-k2-2025',
    language: 'en',
    courseTrack: 'KIDS',
    ageRange: { min: 8, max: 10 },
    editionYear: 2025,
    sequenceOrder: 1,
    code: 'K2',
    title: 'Kids 2',
    previousStageIds: [],
    nextStageIds: ['stage-k4-2025'],
    chapterStructure: { lessonPairsPerChapter: 3, hasReview: true, chapterCount: 10 },
    optionalSpecialLessons: ['WELCOME'],
    lessons: [],
    appSupport: { wizMe: true, wizPen: true },
    cefrBand: 'A1',
    gseRange: { min: 10, max: 22 },
    tags: ['input-output', 'core-sequence', 'kids-entry'],
  },
]
