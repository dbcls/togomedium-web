import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/find-media-by-organism-phenotype')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/find-media-by-organism-phenotype"!</div>
}
