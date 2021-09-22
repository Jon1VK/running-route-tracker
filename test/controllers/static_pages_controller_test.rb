require "test_helper"

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get :index" do
    get static_pages_:index_url
    assert_response :success
  end
end
