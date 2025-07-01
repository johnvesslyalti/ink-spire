import ClientOnly from '@/components/ClientOnly'
import CreatePostForm from '@/components/CreatePostForm'


export default function Create() {
  return (
    <ClientOnly>
      <CreatePostForm />
    </ClientOnly>
  )
}
