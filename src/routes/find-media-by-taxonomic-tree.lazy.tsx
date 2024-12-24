import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/find-media-by-taxonomic-tree')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/find-media-by-taxonomic-tree"!</div>
}
