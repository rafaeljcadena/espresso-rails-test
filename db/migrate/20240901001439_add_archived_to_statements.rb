class AddArchivedToStatements < ActiveRecord::Migration[5.2]
  def change
    add_column :statements, :archived, :boolean, default: false
  end
end
