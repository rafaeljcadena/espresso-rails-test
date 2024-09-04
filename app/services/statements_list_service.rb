# frozen_string_literal: true

class StatementsListService
  attr_reader :statements

  def initialize(current_user, filter, page)
    filter ||= Statement::DEFAULT_STATUS

    @current_user = current_user

    @statements = if @current_user.admin?
                    Statement.admin_query(@current_user.company_id)
                  else
                    Statement.employee_query(@current_user.id)
                  end

    @statements = @statements.where(status: filter).where(archived: false)

    @statements = @statements.rewhere(status: Statement::DEFAULT_STATUS, archived: true) if filter == 'archived'
    @statements = @statements.order(id: :desc).paginate(page: page || 1, per_page: 10)
  end
end
