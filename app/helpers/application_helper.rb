module ApplicationHelper
  def current_user_meta_tag
    if signed_in?
      <<-HTML.html_safe
        <meta
          name="current-user"
          content=#{render('api/users/user.json', user: current_user)}
        />
      HTML
    end
  end
end
