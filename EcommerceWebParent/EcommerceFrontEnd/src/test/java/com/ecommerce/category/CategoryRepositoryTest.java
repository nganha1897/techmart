package com.ecommerce.category;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ecommerce.common.entity.Category;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class CategoryRepositoryTest {
    @Autowired
    private CategoryRepository repo;
    
    @Test
    public void testListEnabledCategories() {
    	List<Category> categories = repo.findAllEnabled();
    	categories.forEach(category -> {
    		System.out.println(category.getName() + " " + category.isEnabled());
    	});
    }
    
    @Test 
    public void testFindCategoryByAlias() {
    	String alias = "electronics";
    	Category ca = repo.findByAliasEnabled(alias);
    	assertThat(ca).isNotNull();
    }
}
