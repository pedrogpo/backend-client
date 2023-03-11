import { features, features_conditionals, features_sliders } from '@prisma/client'
export type IFeature = features & {
  features_sliders: features_sliders[]
} & {
  features_conditionals: features_conditionals[]
}
