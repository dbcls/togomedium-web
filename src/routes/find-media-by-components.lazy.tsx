import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/find-media-by-components')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/find-media-by-components"!</div>
}
