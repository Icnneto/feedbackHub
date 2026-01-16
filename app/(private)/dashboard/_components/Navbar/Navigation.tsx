import Logout from "./logout/Logout"
import PostCounter from "./post-counter/PostCounter"
import SuggestionForm from "./suggestion-form/SuggestionForm"

export default async function Navigation() {
  return (
    <nav className="flex justify-between gap-8 mb-20 border-b border-b-gray-300 pb-5 w-full">
        <div className="flex gap-4 items-baseline">
            <SuggestionForm />
            <p>.</p>
            <PostCounter />
        </div>
        <div>
            <Logout />
        </div>
    </nav>
  )
}
