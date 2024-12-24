import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/compare-media-by-taxids')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/compare-strain"!</div>
}
