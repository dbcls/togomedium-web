import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/compare-media')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/compare-media"!</div>
}
